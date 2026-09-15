import { promises as fs } from "fs";
import path from "path";
import type { OrderRecord, QuestionRecord } from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const QUESTIONS_FILE = path.join(DATA_DIR, "questions.json");

type StoreShape<T> = Record<string, T>;

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
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
  await ensureDir();
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

export async function saveOrder(order: OrderRecord) {
  const store = await readStore<OrderRecord>(ORDERS_FILE);
  store[order.id] = order;
  await writeStore(ORDERS_FILE, store);
  return order;
}

export async function getOrder(id: string) {
  const store = await readStore<OrderRecord>(ORDERS_FILE);
  return store[id] ?? null;
}

export async function getOrderBySession(sessionId: string) {
  const store = await readStore<OrderRecord>(ORDERS_FILE);
  return Object.values(store).find((o) => o.stripeSessionId === sessionId) ?? null;
}

export async function listOrders() {
  const store = await readStore<OrderRecord>(ORDERS_FILE);
  return Object.values(store).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveQuestion(question: QuestionRecord) {
  const store = await readStore<QuestionRecord>(QUESTIONS_FILE);
  store[question.id] = question;
  await writeStore(QUESTIONS_FILE, store);
  return question;
}

export async function listQuestions() {
  const store = await readStore<QuestionRecord>(QUESTIONS_FILE);
  return Object.values(store).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateQuestionStatus(id: string, status: QuestionRecord["status"]) {
  const store = await readStore<QuestionRecord>(QUESTIONS_FILE);
  if (!store[id]) return null;
  store[id] = { ...store[id], status };
  await writeStore(QUESTIONS_FILE, store);
  return store[id];
}
