/**
 * Считает максимальную вложенность циклов for/while в коде C++.
 * Идёт по строкам, ведёт счётчик фигурных скобок и стек открытых циклов:
 * длина стека — текущая вложенность, максимум за проход — результат.
 *
 * @param {string} code Исходный текст программы.
 * @returns {number} Максимальная глубина вложенности циклов (0, если циклов нет).
 */
function bigo(code) {
  code = code.replace(/\/\/.*/g,'');
  const level = [];
  let braces = 0;
  let best = 0;
  for (const line of code.split('\n')) {
    if (/(for|while)/.test(line)) {
      level.push(braces + 1);
      best = Math.max(best, level.length);
    }
    for (const ch of line) {
      if (ch === '{'){
        braces++;
      }
      if (ch === '}') {
        braces--;
        while (level.length && level[level.length - 1] > braces){
          level.pop();
        }
      }
    }
  }
  return best;
}

/**
 * Переводит глубину вложенности циклов в запись асимптотики.
 *
 * @param   {number} depth Глубина вложенности циклов.
 * @returns {string} 'O(1)', 'O(n)', 'O(n^2)' или 'O(n^3)' (для глубины 3 и больше).
 */
function dlina(depth) {
  if (depth === 0) {
    return 'O(1)';
  }
  if (depth === 1) {
    return 'O(n)';
  }
  if (depth === 2){
    return 'O(n^2)'; 
  }
  return 'O(n^3)';
}

/**
 * Точка входа плагина: VS Code вызывает её при первом запуске команды.
 * Регистрирует команду 'bigo.check', которая оценивает асимптотику
 * открытого файла и показывает результат во всплывающем сообщении.
 *
 * @param {Object} context Контекст плагина.
 */
function activate(context) {
  const vscode = require('vscode');
  const cmd = vscode.commands.registerCommand('bigo.check', () => {
  const editor = vscode.window.activeTextEditor;
  const text = editor.document.getText();
    if (!editor) return;
    if (text.trim().length === 0){
      vscode.window.showInformationMessage('File empty');
    }
    else if(text.trim().length != 0){
      vscode.window.showInformationMessage('Asymptotics: ' + dlina(bigo(editor.document.getText())));
    }
  });
  context.subscriptions.push(cmd);
}

module.exports = { activate, bigo, dlina};
