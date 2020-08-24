export default
{
  "$ref": "#/definitions/Digitaljs",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "Circuit": {
      "additionalProperties": false,
      "properties": {
        "connectors": {
          "items": {
            "$ref": "#/definitions/Connector"
          },
          "type": "array"
        },
        "devices": {
          "$ref": "#/definitions/ObjMap%3CDevice%3E"
        }
      },
      "required": [
        "devices",
        "connectors"
      ],
      "type": "object"
    },
    "Connector": {
      "additionalProperties": false,
      "properties": {
        "from": {
          "$ref": "#/definitions/Plug"
        },
        "name": {
          "type": "string"
        },
        "to": {
          "$ref": "#/definitions/Plug"
        }
      },
      "required": [
        "to",
        "from"
      ],
      "type": "object"
    },
    "Device": {
      "anyOf": [
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "type": "number"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "type": {
              "enum": [
                "Not",
                "Repeater"
              ],
              "type": "string"
            }
          },
          "required": [
            "bits",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "type": "number"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "type": {
              "enum": [
                "And",
                "Nand",
                "Or",
                "Nor",
                "Xor",
                "Xnor"
              ],
              "type": "string"
            }
          },
          "required": [
            "bits",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "type": "number"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "type": {
              "enum": [
                "AndReduce",
                "NandReduce",
                "OrReduce",
                "NorReduce",
                "XorReduce",
                "XnorReduce"
              ],
              "type": "string"
            }
          },
          "required": [
            "bits",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "additionalProperties": false,
              "properties": {
                "in1": {
                  "type": "number"
                },
                "in2": {
                  "type": "number"
                },
                "out": {
                  "type": "number"
                }
              },
              "required": [
                "in1",
                "in2",
                "out"
              ],
              "type": "object"
            },
            "fillx": {
              "type": "boolean"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "signed": {
              "additionalProperties": false,
              "properties": {
                "in1": {
                  "type": "number"
                },
                "in2": {
                  "type": "number"
                },
                "out": {
                  "type": "number"
                }
              },
              "required": [
                "in1",
                "in2",
                "out"
              ],
              "type": "object"
            },
            "type": {
              "enum": [
                "ShiftLeft",
                "ShiftRight"
              ],
              "type": "string"
            }
          },
          "required": [
            "bits",
            "fillx",
            "signed",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "additionalProperties": false,
              "properties": {
                "in1": {
                  "type": "number"
                },
                "in2": {
                  "type": "number"
                }
              },
              "required": [
                "in1",
                "in2"
              ],
              "type": "object"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "signed": {
              "additionalProperties": false,
              "properties": {
                "in1": {
                  "type": "boolean"
                },
                "in2": {
                  "type": "boolean"
                }
              },
              "required": [
                "in1",
                "in2"
              ],
              "type": "object"
            },
            "type": {
              "enum": [
                "Eq",
                "Ne",
                "Lt",
                "Le",
                "Gt",
                "Ge"
              ],
              "type": "string"
            }
          },
          "required": [
            "bits",
            "signed",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "constant": {
              "type": "string"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "type": {
              "enum": [
                "Constant"
              ],
              "type": "string"
            }
          },
          "required": [
            "constant",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "additionalProperties": false,
              "properties": {
                "in": {
                  "type": "number"
                },
                "out": {
                  "type": "number"
                }
              },
              "required": [
                "in",
                "out"
              ],
              "type": "object"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "signed": {
              "type": "boolean"
            },
            "type": {
              "enum": [
                "Negation",
                "UnaryPlus"
              ],
              "type": "string"
            }
          },
          "required": [
            "bits",
            "signed",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "additionalProperties": false,
              "properties": {
                "in1": {
                  "type": "number"
                },
                "in2": {
                  "type": "number"
                },
                "out": {
                  "type": "number"
                }
              },
              "required": [
                "in1",
                "in2",
                "out"
              ],
              "type": "object"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "signed": {
              "additionalProperties": false,
              "properties": {
                "in1": {
                  "type": "boolean"
                },
                "in2": {
                  "type": "boolean"
                }
              },
              "required": [
                "in1",
                "in2"
              ],
              "type": "object"
            },
            "type": {
              "enum": [
                "Addition",
                "Subtraction",
                "Multiplication",
                "Division",
                "Modulo",
                "Power"
              ],
              "type": "string"
            }
          },
          "required": [
            "bits",
            "signed",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "additionalProperties": false,
              "properties": {
                "in": {
                  "type": "number"
                },
                "sel": {
                  "type": "number"
                }
              },
              "required": [
                "in",
                "sel"
              ],
              "type": "object"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "type": {
              "enum": [
                "Mux"
              ],
              "type": "string"
            }
          },
          "required": [
            "bits",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "additionalProperties": false,
              "properties": {
                "in": {
                  "type": "number"
                },
                "sel": {
                  "type": "number"
                }
              },
              "required": [
                "in",
                "sel"
              ],
              "type": "object"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "type": {
              "enum": [
                "Mux1Hot"
              ],
              "type": "string"
            }
          },
          "required": [
            "bits",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "type": "number"
            },
            "initial": {
              "type": "string"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "polarity": {
              "additionalProperties": false,
              "properties": {
                "arst": {
                  "type": "boolean"
                },
                "clock": {
                  "type": "boolean"
                },
                "enable": {
                  "type": "boolean"
                }
              },
              "type": "object"
            },
            "type": {
              "enum": [
                "Dff"
              ],
              "type": "string"
            }
          },
          "required": [
            "bits",
            "polarity",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "abits": {
              "type": "number"
            },
            "bits": {
              "type": "number"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "offset": {
              "type": "number"
            },
            "order": {
              "type": "number"
            },
            "rdports": {
              "items": {
                "additionalProperties": false,
                "properties": {
                  "clock_polarity": {
                    "type": "boolean"
                  },
                  "enable_polarity": {
                    "type": "boolean"
                  },
                  "transparent": {
                    "type": "boolean"
                  }
                },
                "type": "object"
              },
              "type": "array"
            },
            "type": {
              "enum": [
                "Memory"
              ],
              "type": "string"
            },
            "words": {
              "type": "number"
            },
            "wrports": {
              "items": {
                "additionalProperties": false,
                "properties": {
                  "clock_polarity": {
                    "type": "boolean"
                  },
                  "enable_polarity": {
                    "type": "boolean"
                  }
                },
                "type": "object"
              },
              "type": "array"
            }
          },
          "required": [
            "abits",
            "bits",
            "offset",
            "rdports",
            "type",
            "words",
            "wrports"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "enum": [
                1
              ],
              "type": "number"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "propagation": {
              "type": "number"
            },
            "type": {
              "enum": [
                "Clock"
              ],
              "type": "string"
            }
          },
          "required": [
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "enum": [
                1
              ],
              "type": "number"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "type": {
              "enum": [
                "Button"
              ],
              "type": "string"
            }
          },
          "required": [
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "enum": [
                1
              ],
              "type": "number"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "type": {
              "enum": [
                "Lamp"
              ],
              "type": "string"
            }
          },
          "required": [
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "type": "number"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "numbase": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "type": {
              "enum": [
                "NumEntry"
              ],
              "type": "string"
            }
          },
          "required": [
            "bits",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "type": "number"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "numbase": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "type": {
              "enum": [
                "NumDisplay"
              ],
              "type": "string"
            }
          },
          "required": [
            "bits",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "type": "number"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "type": {
              "enum": [
                "Input"
              ],
              "type": "string"
            }
          },
          "required": [
            "bits",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "type": "number"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "type": {
              "enum": [
                "Output"
              ],
              "type": "string"
            }
          },
          "required": [
            "bits",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "groups": {
              "items": {
                "type": "number"
              },
              "type": "array"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "type": {
              "enum": [
                "BusGroup"
              ],
              "type": "string"
            }
          },
          "required": [
            "groups",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "groups": {
              "items": {
                "type": "number"
              },
              "type": "array"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "type": {
              "enum": [
                "BusUngroup"
              ],
              "type": "string"
            }
          },
          "required": [
            "groups",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "slice": {
              "additionalProperties": false,
              "properties": {
                "count": {
                  "type": "number"
                },
                "first": {
                  "type": "number"
                },
                "total": {
                  "type": "number"
                }
              },
              "required": [
                "first",
                "count",
                "total"
              ],
              "type": "object"
            },
            "type": {
              "enum": [
                "BusSlice"
              ],
              "type": "string"
            }
          },
          "required": [
            "slice",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "extend": {
              "additionalProperties": false,
              "properties": {
                "input": {
                  "type": "number"
                },
                "output": {
                  "type": "number"
                }
              },
              "required": [
                "input",
                "output"
              ],
              "type": "object"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "type": {
              "enum": [
                "ZeroExtend",
                "SignExtend"
              ],
              "type": "string"
            }
          },
          "required": [
            "extend",
            "type"
          ],
          "type": "object"
        },
        {
          "additionalProperties": false,
          "properties": {
            "bits": {
              "additionalProperties": false,
              "properties": {
                "in": {
                  "type": "number"
                },
                "out": {
                  "type": "number"
                }
              },
              "required": [
                "in",
                "out"
              ],
              "type": "object"
            },
            "current_state": {
              "type": "number"
            },
            "init_state": {
              "type": "number"
            },
            "label": {
              "type": "string"
            },
            "net": {
              "type": "string"
            },
            "order": {
              "type": "number"
            },
            "states": {
              "type": "number"
            },
            "trans_table": {
              "items": {
                "additionalProperties": false,
                "properties": {
                  "ctrl_in": {
                    "type": "string"
                  },
                  "ctrl_out": {
                    "type": "string"
                  },
                  "state_in": {
                    "type": "number"
                  },
                  "state_out": {
                    "type": "number"
                  }
                },
                "required": [
                  "ctrl_in",
                  "ctrl_out",
                  "state_in",
                  "state_out"
                ],
                "type": "object"
              },
              "type": "array"
            },
            "type": {
              "enum": [
                "FSM"
              ],
              "type": "string"
            }
          },
          "required": [
            "bits",
            "current_state",
            "init_state",
            "states",
            "trans_table",
            "type"
          ],
          "type": "object"
        }
      ]
    },
    "Digitaljs": {
      "additionalProperties": false,
      "properties": {
        "connectors": {
          "items": {
            "$ref": "#/definitions/Connector"
          },
          "type": "array"
        },
        "devices": {
          "$ref": "#/definitions/ObjMap%3CDevice%3E"
        },
        "subcircuits": {
          "$ref": "#/definitions/ObjMap%3CCircuit%3E"
        }
      },
      "required": [
        "devices",
        "connectors",
        "subcircuits"
      ],
      "type": "object"
    },
    "ObjMap<Circuit>": {
      "additionalProperties": {
        "$ref": "#/definitions/Circuit"
      },
      "type": "object"
    },
    "ObjMap<Device>": {
      "additionalProperties": {
        "$ref": "#/definitions/Device"
      },
      "type": "object"
    },
    "Plug": {
      "additionalProperties": false,
      "properties": {
        "id": {
          "type": "string"
        },
        "port": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "port"
      ],
      "type": "object"
    }
  }
}