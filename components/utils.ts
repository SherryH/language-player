// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
// https://www.newline.co/@bespoyasov/how-to-use-fetch-with-typescript--a81ac257
export const client = (
  inputUrl: RequestInfo,
  customConfig: RequestInit = {}
): Promise<string> => {
  const headers = { 'Content-Type': 'text/vtt' };
  const config = {
    method: customConfig.body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig?.headers,
    },
    ...(customConfig.body && { body: JSON.stringify(customConfig.body) }),
  };

  return window.fetch(inputUrl, config).then(async (response) => {
    const data = await response.text();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

const transformTimeStringToNumber = (timeString: string) => {
  const plainString = timeString?.split(':').join('');
  return Number(plainString);
};

export const getCaptions = (captionText: string) => {
  const lines = captionText.split('\n\n');
  console.log({ lines });
  return lines
    .filter((text) => !text.includes('WEBVTT'))
    .map((line) => {
      const [time, caption] = line.split('\n');
      const [start, end] = time.split('-->');
      console.log(start);
      return {
        start: transformTimeStringToNumber(start),
        end: transformTimeStringToNumber(end),
        caption,
      };
    });
};
