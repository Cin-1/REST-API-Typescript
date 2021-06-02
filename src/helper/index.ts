//class for emails
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
//function for ageEndpoint
export let calculateAge = function (birthTimestamp: number): number {
  const diff = Date.now() - birthTimestamp;
  const age = new Date(diff);

  return Math.abs(age.getUTCFullYear() - 1970);
};
