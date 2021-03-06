function getRandom(prefix) {
  return (
    prefix +
    Math.random()
      .toString()
      .slice(2)
  )
}

function isContain(elem, child) {
  return elem.contains(child)
}

function getPasteHtml(e, filterStyle, ignoreImg) {
  let clipboardData =
    e.clipboardData || (e.originalEvent && e.originalEvent.clipboardData)
  let pasteText = void 0,
    pasteHtml = void 0
  if (clipboardData == null) {
    pasteText = window.clipboardData && window.clipboardData.getData('text')
  } else {
    pasteText = clipboardData.getData('text/plain')
    pasteHtml = clipboardData.getData('text/html')
  }
  if (!pasteHtml && pasteText) {
    pasteHtml = '<p>' + replaceHtmlSymbol(pasteText) + '</p>'
  }
  if (!pasteHtml) {
    return
  }

  // 过滤word中状态过来的无用字符
  let docSplitHtml = pasteHtml.split('</html>')
  if (docSplitHtml.length === 2) {
    pasteHtml = docSplitHtml[0]
  }

  // 过滤无用标签
  pasteHtml = pasteHtml.replace(/<(meta|script|link).+?>/gim, '')
  // 去掉注释
  pasteHtml = pasteHtml.replace(/<!--.*?-->/gm, '')
  // 过滤 data-xxx 属性
  pasteHtml = pasteHtml.replace(/\s?data-.+?=('|").+?('|")/gim, '')

  if (ignoreImg) {
    // 忽略图片
    pasteHtml = pasteHtml.replace(/<img.+?>/gim, '')
  }

  if (filterStyle) {
    // 过滤样式
    pasteHtml = pasteHtml.replace(/\s?(class|style)=('|").*?('|")/gim, '')
  } else {
    // 保留样式
    pasteHtml = pasteHtml.replace(/\s?class=('|").*?('|")/gim, '')
  }

  return pasteHtml
}

function replaceHtmlSymbol(html) {
  if (html == null) {
      return ''
  }
  return html.replace(/</gm, '&lt;').replace(/>/gm, '&gt;').replace(/"/gm, '&quot;').replace(/(\r\n|\r|\n)/g, '<br/>')
}

function getPasteText(e) {
  let clipboardData =
    e.clipboardData || (e.originalEvent && e.originalEvent.clipboardData)
  let pasteText = void 0
  if (clipboardData == null) {
    pasteText = window.clipboardData && window.clipboardData.getData('text')
  } else {
    pasteText = clipboardData.getData('text/plain')
  }

  return replaceHtmlSymbol(pasteText)
}
function addListenerMulti(element, eventNames, listener) {
  var events = eventNames.split(' ')
  for (let i = 0; i < events.length; i++) {
    element.addEventListener(events[i], listener, false)
  }
}

function isFunction(fn) {
  return typeof fn === 'function';
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\t/g, "    ")
}

function countLines(val) {
  if (val == '') {
		return 1
	}
	return val.split('\n').length
}

function updateRowNum(cntline) {
  let tmpstr = ''
  for (let i = 1; i <= cntline; i++) {
    tmpstr = tmpstr + i.toString() + '\n'
  }
  return tmpstr
}

export { getRandom, isContain, getPasteHtml, getPasteText, addListenerMulti, isFunction, escapeHtml, countLines, updateRowNum }
