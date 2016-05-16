function err(error) {
  this.json({ 'err': error.stack });
}

export default err;
