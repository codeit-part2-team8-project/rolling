/* eslint-disable no-useless-return */
const getInformation = async () => {
  try {
    const response = await fetch(
      'https://rolling-api.vercel.app/2-8/recipients/?limit=0',
    );
    const body = await response.json();
    return body;
  } catch (err) {
    console.log(err.message);
  }

  // eslint-disable-next-line consistent-return
  return;
};

export default getInformation;
