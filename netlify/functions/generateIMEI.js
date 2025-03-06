const luhn = require('luhn');

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a valid IMEI number
function generateIMEI() {
  let imeiWithoutCheckDigit = '';

  // Generate TAC (first 8 digits)
  for (let i = 0; i < 8; i++) {
    imeiWithoutCheckDigit += getRandomInt(0, 9).toString();
  }

  // Generate SNR (next 6 digits)
  for (let i = 0; i < 6; i++) {
    imeiWithoutCheckDigit += getRandomInt(0, 9).toString();
  }

  // Calculate the check digit using luhn library's checkDigit method
  const checkDigit = luhn.generate(imeiWithoutCheckDigit);

  // Complete the IMEI with the check digit
  const imei = imeiWithoutCheckDigit + checkDigit;

  return imei;
}

exports.handler = async function(event, context) {
  const imei = generateIMEI();  // Generate IMEI
  return {
    statusCode: 200,
    body: JSON.stringify({ imei })  // Return IMEI as JSON response
  };
};
