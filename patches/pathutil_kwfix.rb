# frozen_string_literal: true

# Work around a Ruby 3 keyword-args bug in pathutil 0.16.2.
# The gem calls File.read(self, *args, kwd) which passes a Hash as a positional
# argument and can raise: "no implicit conversion of Hash into Integer".
#
# This patch redefines Pathutil#read and #binread to splat keyword arguments.

require "pathutil"

class Pathutil
  def read(*args, **kwd)
    kwd[:encoding] ||= encoding

    if normalize[:read]
      File.read(self, *args, **kwd).encode(universal_newline: true)
    else
      File.read(self, *args, **kwd)
    end
  end

  def binread(*args, **kwd)
    kwd[:encoding] ||= encoding

    if normalize[:read]
      File.binread(self, *args, **kwd).encode(universal_newline: true)
    else
      File.binread(self, *args, **kwd)
    end
  end
end
