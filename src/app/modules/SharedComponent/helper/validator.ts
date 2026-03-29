export class ValidationPattern {
  static Email = /^[0-9]{9}|[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5}/;
  static Password =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  static Mobile = /^05\d{8}$/;
  static arabicAndEnglishOnly = /^[\u0600-\u06FF\u0750-\u077Fa-zA-Z\s]*$/;
  static decimal = /^(0|[1-9]\d*)(\.\d+)?$/;
  static donotContainSpecialChar = /^[\u0600-\u06FF\u0750-\u077Fa-zA-Z0-9\s ]*$/;
  static urlPattern =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{1,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{1,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{1,}|www\.[a-zA-Z0-9]+\.[^\s]{1,})/gi;
}
