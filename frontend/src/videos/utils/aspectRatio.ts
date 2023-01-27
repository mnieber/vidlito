export const widthToHeight = (width: number) => {
  return (width * 9) / 16;
};

export const heightToWidth = (height: number) => {
  return (height * 16) / 9;
};

export function getVideoWidth(isFullVideoWidth: boolean, panelWidth: number) {
  const maxWidthDictatedByScreen = heightToWidth(window.screen.height * 16) / 9;
  const maxVideoWidth = isFullVideoWidth ? 1200 : 800;
  const videoPanelWidth = panelWidth ?? 100;

  const videoWidth = Math.min(
    maxVideoWidth,
    videoPanelWidth,
    maxWidthDictatedByScreen
  );
  return videoWidth;
}
