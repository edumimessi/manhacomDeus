import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const box = { window: {} };
vm.runInNewContext(readFileSync(new URL('../assets/dias.js', import.meta.url), 'utf8'), box);
const { DEVOCIONAL_META: meta, MESES: meses, DIAS: dias } = box.window;
const errors = [];
const warnings = [];
const error = msg => errors.push(msg);
const warning = msg => warnings.push(msg);
const norm = s => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

if (!meta || meta.fuso !== 'America/Sao_Paulo') error('fuso editorial deve ser America/Sao_Paulo');
if (!meta?.notaBiblica) error('nota sobre os excertos bíblicos ausente');
if (!meses || Object.keys(meses).length !== 12) error('devem existir 12 meses');
if (!Array.isArray(dias) || dias.length !== 366) error(`esperadas 366 meditações; encontradas ${dias?.length ?? 0}`);

const required = ['m','d','sem','st','tipo','rot','tit','med','pra','ora'];
const dates = new Set();
for (const day of dias ?? []) {
  const key = `${day.m}-${day.d}`;
  for (const field of required) if (day[field] == null || String(day[field]).trim() === '') error(`${key}: campo vazio — ${field}`);
  const last = new Date(Date.UTC(2024, day.m, 0)).getUTCDate();
  if (day.m < 1 || day.m > 12 || day.d < 1 || day.d > last) error(`${key}: data inválida`);
  if (dates.has(key)) error(`${key}: data duplicada`);
  dates.add(key);
  if (Boolean(day.ref) !== Boolean(day.txt)) error(`${key}: referência e texto bíblico devem aparecer juntos`);
}

for (let m=1; m<=12; m++) {
  const last = new Date(Date.UTC(2024, m, 0)).getUTCDate();
  for (let d=1; d<=last; d++) if (!dates.has(`${m}-${d}`)) error(`${m}-${d}: data ausente`);
}

for (const field of ['tit','med','pra','ora']) {
  const seen = new Map();
  for (const day of dias ?? []) {
    const value = norm(day[field]);
    const key = `${day.m}-${day.d}`;
    if (seen.has(value)) error(`${key}: ${field} duplica ${seen.get(value)}`);
    seen.set(value, key);
  }
}

const absolutes = [
  /n[úu]cleo que (a dor|nada) n[aã]o alcan[çc]a/i,
  /n[úu]cleo que n[aã]o adoece/i,
  /nenhuma doen[çc]a.{0,35}(toca|alcan[çc]a)/i,
  /quase todo sofrimento se torna suport[aá]vel/i
];
for (const day of dias ?? []) {
  const text = [day.med,day.pra,day.ora].join(' ');
  for (const re of absolutes) if (re.test(text)) error(`${day.m}-${day.d}: formulação absoluta sobre sofrimento ou saúde (${re})`);
}

const repeatedRefs = new Map();
for (const day of dias ?? []) if (day.ref) {
  const key = norm(day.ref);
  repeatedRefs.set(key, [...(repeatedRefs.get(key) ?? []), `${day.m}-${day.d}`]);
}
for (const [ref, list] of repeatedRefs) if (list.length > 2) warning(`referência reutilizada (${ref}): ${list.join(', ')}`);

console.log(`Deus e Sentido — auditoria\n${dias.length} meditações · ${Object.keys(meses).length} meses`);
for (const w of warnings) console.log(`  aviso  ${w}`);
for (const e of errors) console.error(`  erro   ${e}`);
if (errors.length) process.exit(1);
console.log(`Sem erros. ${warnings.length} aviso(s).`);
