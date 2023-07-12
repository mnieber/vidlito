export const widthToHeight = (width: number) => {
  return (width * 9) / 16;
};

export const heightToWidth = (height: number) => {
  return (height * 16) / 9;
};

export function getVideoWidth(maxWidth: number, panelWidth: number) {
  const maxWidthDictatedByScreen = heightToWidth(window.screen.height * 16) / 9;
  const videoPanelWidth = panelWidth ?? 100;

  const videoWidth = Math.min(
    maxWidth,
    videoPanelWidth,
    maxWidthDictatedByScreen
  );
  return videoWidth;
}
