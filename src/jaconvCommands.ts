import * as vscode from 'vscode';
const jaconv = require('jaconv');

const JACONV_COMMANDS=[
/*
  { name: 'toHebon', desc: '全角ひらがなをヘボン式ローマ字で半角英文字に変換', handler: jaconv.toHebon },
  { name: 'toKatakana', desc: '全角ひらがなを全角カタカナに変換', handler: jaconv.toKatakana },
  { name: 'toHiragana', desc: '全角カタカナを全角ひらがなに変換', handler: jaconv.toHiragana },
  { name: 'toHanAscii', desc: '全角英数記号を半角に変換', handler: jaconv.toHanAscii },
  { name: 'toZenAscii', desc: '半角英数記号を全角に変換', handler: jaconv.toZenAscii },
  { name: 'toHanKana', desc: '全角カタカナを半角に変換', handler: jaconv.toHanKana },
  { name: 'toZenKana', desc: '半角カタカナを全角に変換', handler: jaconv.toZenKana },
  { name: 'toHan', desc: '全角英数記号、カタカナを半角に変換', handler: jaconv.toHan },
  { name: 'toZen', desc: '半角英数記号、カタカナを全角に変換', handler: jaconv.toZen },
  { name: 'normalize', desc: '全角英数記号を半角に、半角カタカナを全角に変換', handler: jaconv.normalize } 
*/
  { name: 'toHebon', desc: 'Convert full-width Hiragana to half-width Ascii with Hebon-style letters', handler: jaconv.toHebon },
  { name: 'toKatakana', desc: 'Convert full-width Hiragana to full-width Katakana', handler: jaconv.toKatakana },
  { name: 'toHiragana', desc: 'Covert full-width Katakana to full-width Hiragana', handler: jaconv.toHiragana },
  { name: 'toHanAscii', desc: 'Convert full-width Ascii to half-width', handler: jaconv.toHanAscii },
  { name: 'toZenAscii', desc: 'Convert half-width Ascii to full-width', handler: jaconv.toZenAscii },
  { name: 'toHanKana', desc: 'Convert full-width Katakana to half-width', handler: jaconv.toHanKana },
  { name: 'toZenKana', desc: 'Convert half-width Katakana to full-width', handler: jaconv.toZenKana },
  { name: 'toHan', desc: 'Convert full-width Ascii & Katakana to half-width', handler: jaconv.toHan },
  { name: 'toZen', desc: 'Convert half-width Ascii & Katakana to full-wiwdth', handler: jaconv.toZen },
  { name: 'normalize', desc: 'Convert full-width Ascii to half-width, and half-width Katakana to full-width', handler: jaconv.normalize } 
];

export function JaconvCommands() {

  const qpItems: vscode.QuickPickItem[] = JACONV_COMMANDS.map(c => ({ label: c.name, description: c.desc }));
  vscode.window.showQuickPick(
    qpItems,
      {
        canPickMany: false,
        placeHolder: 'Choose a Jaconv command'
      }
  ).then (
    selectedItem => { 
      if (selectedItem) { 
        runCommand(selectedItem.label);
      }
    }
  );
}

function runCommand(name: string): void {
  const command = JACONV_COMMANDS.filter(c => c.name === name)[0];
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    let selections: vscode.Selection[] = editor.selections;
    editor.edit(builder => {
        for (const selection of selections) {
        const text = editor.document.getText(
                    new vscode.Range(selection.start, selection.end
                ));
              builder.replace(selection, command.handler(text));
          }
      });
  } 
}