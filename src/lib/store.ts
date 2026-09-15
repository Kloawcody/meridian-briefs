import { promises as fs } from "fs";
import os from "os";
import path from "path";
import type { OrderRecord, QuestionRecord } from "./types";

const memoryOrders = new Map<string, OrderRecord>();
const memoryQuestions = new Map<string, QuestionRecord>();

function dataDir() {
  // Vercel/serverless project dirs are read-only; /tmp is writable per instance.
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "meridian-briefs");
  }
  return path.join(process.cwd(), ".data");
}

const ordersFile = () => path.join(dataDir(), "orders.json");
const questionsFile = () => path.join(dataDir(), "questions.json");

type StoreShape<T> = Record<string, T>;

async function ensureDir() {
  await fs.mkdir(dataDir(), { recursive: true });
}

async function readStore<T>(file: string): Promise<StoreShape<T>> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as StoreShape<T>;
  } catch {
    return {};
  }
}

async function writeStore<T>(file: string, data: StoreShape<T>) {
  try {
    await ensureDir();
    await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
  } catch {
    // Memory remains the source of truth when disk is unavailable.
  }
}

export async function saveOrder(order: OrderRecord) {
  memoryOrders.set(order.id, order);
  const store = await readStore<OrderRecord>(ordersFile());
  store[order.id] = order;
  await writeStore(ordersFile(), store);
  return order;
}

export async function getOrder(id: string) {
  if (memoryOrders.has(id)) return memoryOrders.get(id)!;
  const store = await readStore<OrderRecord>(ordersFile());
  const order = store[id] ?? null;
  if (order) memoryOrders.set(id, order);
  return order;
}

export async function getOrderBySession(sessionId: string) {
  for (const order of memoryOrders.values()) {
    if (order.stripeSessionId === sessionId) return order;
  }
  const store = await readStore<OrderRecord>(ordersFile());
  const order = Object.values(store).find((o) => o.stripeSessionId === sessionId) ?? null;
  if (order) memoryOrders.set(order.id, order);
  return order;
}

export async function listOrders() {
  const store = await readStore<OrderRecord>(ordersFile());
  for (const order of memoryOrders.values()) store[order.id] = order;
  return Object.values(store).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveQuestion(question: QuestionRecord) {
  memoryQuestions.set(question.id, question);
  const store = await readStore<QuestionRecord>(questionsFile());
  store[question.id] = question;
  await writeStore(questionsFile(), store);
  return question;
}

export async function listQuestions() {
  const store = await readStore<QuestionRecord>(questionsFile());
  for (const q of memoryQuestions.values()) store[q.id] = q;
  return Object.values(store).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateQuestionStatus(id: string, status: QuestionRecord["status"]) {
  const existing = memoryQuestions.get(id) ?? (await readStore<QuestionRecord>(questionsFile()))[id];
  if (!existing) return null;
  const updated = { ...existing, status };
  memoryQuestions.set(id, updated);
  const store = await readStore<QuestionRecord>(questionsFile());
  store[id] = updated;
  await writeStore(questionsFile(), store);
  return updated;
}
