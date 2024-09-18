import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fsp from 'node:fs/promises';
import { MainPage } from './pages/mainPage';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
export const readTestFile = async (fileName) => fsp.readFile(getFixturePath(fileName), 'utf-8');

export const setUp = () => new MainPage();
