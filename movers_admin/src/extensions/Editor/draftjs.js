import {
  convertToRaw,
  EditorState,
  convertFromHTML,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

export const stateToHTML = (state) =>
  draftToHtml(convertToRaw(state.getCurrentContent()));

export const HTMLToState = (htmlValue) => {
  const blocksFromHTML = convertFromHTML(htmlValue);

  const content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  return EditorState.createWithContent(content);
};
// EditorState.createWithContent(ContentState.createFrom(htmlValue));
