// Caret position


export const getCursorXY = (input, selectionPoint) => {
  const {
    offsetLeft: inputX,
    offsetTop: inputY,
  } = input
  // create a dummy element that will be a clone of our input
  const div = document.createElement(input.tagName)
  // get the computed style of the input and clone it onto the dummy element
  const copyStyle = getComputedStyle(input)
  for (const prop of copyStyle) {
    div.style[prop] = copyStyle[prop]
  }
  div.style.position = 'relative'
  /*if (['TEXTAREA', 'DIV'].includes(input.tagName))*/ div.style.height = 'auto'
  // if a single line input then the div needs to be single line and not break out like a text area
  if (input.tagName === 'INPUT') div.style.width = 'auto'
  if (input.tagName !== 'DIV') div.style.display = 'block'
  div.style.maxWidth = input.getBoundingClientRect().width + 'px'
  
  // we need a character that will replace whitespace when filling our dummy element if it's a single line <input/>
  const swap = '.'
  const inputValue = input.tagName === 'INPUT' ? input.value.replace(/ /g, swap) : (
    input.tagName === 'DIV' ? input.innerHTML : input.innerHTML
  )
  // set the div content to that of the textarea up until selection
  const content = inputValue.substr(0, selectionPoint)
  // console.log(content)
  // set the text content of the dummy element div
  div.innerHTML = content
  // create a marker element to obtain caret position
  const span = document.createElement('span')
  // give the span the textContent of remaining content so that the recreated dummy element is as close as possible
  span.style.display = 'inline'
  span.style.outline = '2px solid red'
  // if (input.tagName === 'DIV') {
    span.innerHTML = inputValue.substr(selectionPoint)
  // } else {
  //   span.textContent = inputValue.substr(selectionPoint)
  // }
  // append the span marker to the div
  div.appendChild(span)
  // append the dummy element to the body
  document.body.appendChild(div)
  // get the marker position, this is the caret position top and left relative to the input
  const { offsetLeft: spanX, offsetTop: spanY } = span
  // lastly, remove that dummy element
  // NOTE:: can comment this out for debugging purposes if you want to see where that span is rendered
  // document.body.removeChild(div)
  // return an object with the x and y of the caret. account for input positioning so that you don't need to wrap the input
  console.log(inputX, spanX)
  return {
    x: inputX + spanX,
    y: inputY + spanY,
  }
}

export function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = sel.getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            sel.removeAllRanges()
            sel.addRange(preCaretRange)
            console.log(sel.toString())
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

export function createRange(node, chars, range) {
    if (!range) {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
    }

    if (chars.count === 0) {
        range.setEnd(node, chars.count);
    } else if (node && chars.count >0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
                chars.count -= node.textContent.length;
            } else {
                range.setEnd(node, chars.count);
                chars.count = 0;
            }
        } else {
           for (var lp = 0; lp < node.childNodes.length; lp++) {
                range = createRange(node.childNodes[lp], chars, range);

                if (chars.count === 0) {
                    break;
                }
            }
        }
    }
    return range;
};

export function setCurrentCursorPosition(el, chars) {
  if (chars >= 0) {
    var selection = window.getSelection()

    let range = createRange(el, { count: chars })

    if (range) {
      // console.log(range)
      range.collapse()
      // console.log('endContainer:', range.endContainer, 'endOffset:', range.endOffset)
      selection.removeAllRanges()
      selection.addRange(range)
      selection.collapseToEnd()
    }
  }
}

// #BOOKMARK: try use this (to end of file) to get HTML-inclusive caret index position
function getCaretPosition (node) {
    var range = window.getSelection().getRangeAt(0),
        preCaretRange = range.cloneRange(),
        caretPosition,
        tmp = document.createElement("div");

    preCaretRange.selectNodeContents(node);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    tmp.appendChild(preCaretRange.cloneContents());
    caretPosition = tmp.innerHTML.length;
    return caretPosition;
}

export function getHTMLCaretPosition(element) {
  var textPosition = getCaretPosition(element),
      htmlContent = element.innerHTML,
      textIndex = 0,
      htmlIndex = 0,
      insideHtml = false,
      htmlBeginChars = [/*'&',*/ '<'],
      htmlEndChars   = [/*';',*/ '>'];
  
  
  if (textPosition == 0) {
    return 0;
  }
  
  while(textIndex < textPosition) {
  
    htmlIndex++;
  
    // check if next character is html and if it is, iterate with htmlIndex to the next non-html character
    while(htmlBeginChars.indexOf(htmlContent.charAt(htmlIndex)) > -1) {
      // console.log('encountered HTML');
      // now iterate to the ending char
      insideHtml = true;
  
      while(insideHtml) {
        if (htmlEndChars.indexOf(htmlContent.charAt(htmlIndex)) > -1) {
          if (htmlContent.charAt(htmlIndex) == ';') {
            htmlIndex--; // entity is char itself
          }
          // console.log('encountered end of HTML');
          insideHtml = false;
        }
        htmlIndex++;
      }
    }
    textIndex++;
  }
  
  // console.log(htmlIndex);
  // console.log(textPosition);
  // in htmlIndex is caret position inside html
  return htmlIndex;
}

export function getLineHeight(element){
   var temp = document.createElement(element.nodeName);
   temp.setAttribute("style","margin:0px;padding:0px;font-family:"+element.style.fontFamily+";font-size:"+element.style.fontSize);
   temp.innerHTML = "test";
   temp = element.parentNode.appendChild(temp);
   var ret = temp.clientHeight;
   temp.parentNode.removeChild(temp);
   return ret;
}