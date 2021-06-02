export class Msg {
  to: String;
  from: String;
  subject: String;
  text: String;
  constructor(to: String, from: String, subject: String, text: String) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.text = text;
  }
}
