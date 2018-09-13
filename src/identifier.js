function Identifier (site, clock) {
  var self = this

  self.site = site
  self.clock = clock
}

Identifier.prototype.equals = function (other) {
  var self = this

  return self.site === other.site && self.clock === other.clock
}

Identifier.prototype.isLessThan = function (other) {
  var self = this

  return self.site < other.site || (self.site === other.site && self.clock < other.clock)
}

module.exports = Identifier
