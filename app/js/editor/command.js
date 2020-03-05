export default class Command {
  constructor(editor) {
    this.editor = editor;
  }
  queryCommandSupported(name) {
    return document.queryCommandSupported(name);
  }
  queryCommandValue(name) {
    return document.queryCommandValue(name);
  }   
  queryCommandState(name) {
    return document.queryCommandState(name);
  } 

  createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild; 
  }
  _execCommand(name, value) {
    document.execCommand(name, false, value);
  }
  
  _insertHTML(html) {
    let editor = this.editor;
    let range = editor.selection.getRange();

    if (this.queryCommandSupported('insertHTML')) {
        // W3C
        this.pExecCommand('insertHTML', html);
    } else if (range.insertNode) {
        // IE
        range.deleteContents();
        range.insertNode(createElementFromHTML(html));
    } else if (range.pasteHTML) {
        // IE <= 10
        range.pasteHTML(html);
    }
  }
  execCmd(name, value) {
    let editor = this.editor;
    if (!editor.selection.getRange()) {
      return;
    }
    editor.selection.restoreSelection();
    let cmdName = '_' + name;
    if (this[cmdName]) {
      this[cmdName](value);
    } else {
        this._execCommand(name, value);
    }
  }
}