let commands = {}, helpers = {}, extensions = {};

commands.title = async function () {
  this.assertWebviewContext();
  return this.appModel.title;
};

Object.assign(extensions, commands, helpers);
export { commands, helpers };
export default extensions;
