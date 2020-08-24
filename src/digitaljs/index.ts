
export type ObjMap<T> = { [key : string] : T }

export type UnaryGate = {
  type: "Not" | "Repeater",
  bits: number,
}

export type BinaryGate = {
  type: "And" | "Nand" | "Or" | "Nor" | "Xor" | "Xnor",
  bits: number
}

export type ReducingGate = {
  type: "AndReduce" | "NandReduce" | "OrReduce" | "NorReduce" | "XorReduce" | "XnorReduce"
  bits: number
}

export type BitShift = {
  type: "ShiftLeft" | "ShiftRight",
  bits: {
    in1: number,
    in2: number,
    out: number
  },
  signed: {
    in1: number,
    in2: number,
    out: number,
  }
  fillx: boolean
}

export type Comparision = {
  type: "Eq" | "Ne" | "Lt" | "Le" | "Gt" | "Ge",
  bits: {
    in1: number,
    in2: number,
  },
  signed: {
    in1: boolean,
    in2: boolean,
  }
}

export type Constant = {
  type: "Constant",
  constant: string,
}

export type UnaryArith = {
  type: "Negation" | "UnaryPlus",
  bits: {
    in: number,
    out: number,
  },
  signed: boolean,
}

export type BinaryArith = {
  type: "Addition" | "Subtraction" | "Multiplication" | "Division" | "Modulo" | "Power",
  bits: {
    in1: number,
    in2: number,
    out: number,
  }
  signed: {
    in1: boolean,
    in2: boolean,
  }
}

export type Mux = {
  type: "Mux",
  bits: {
    in: number,
    sel: number
  },
}

export type Mux1Hot = {
  type: "Mux1Hot",
  bits: {
    in: number,
    sel: number,
  }
}

export type Dff = {
  type: "Dff",
  bits: number,
  polarity: {
    clock?: boolean,
    arst?: boolean,
    enable?: boolean,
  },
  initial?: string
}

export type Memory = {
  type: "Memory",
  bits: number,
  abits: number,
  words: number,
  offset: number,
  rdports: Array<{
    enable_polarity?: boolean,
    clock_polarity?: boolean,
    transparent?: boolean,
  }>,
  wrports: Array<{
    enable_polarity?: boolean,
    clock_polarity?: boolean,
  }>
}

export type Clock = {
  type: "Clock",
  bits?: 1, // Those fields are not present in spec, but are outputed by yosys converter???
  propagation?: number,
}

export type Button = {
  type: "Button",
  bits?: 1,
}

export type Lamp = {
  type: "Lamp",
  bits?: 1,
}

export type NumEntry = {
  type: "NumEntry",
  bits: number,
  // yosys converter doesnt produce this value, maybe its optional
  numbase?: string,
}

export type NumDisplay = {
  type: "NumDisplay",
  bits: number,
  // yosys converter doesnt produce this value, maybe its optional
  numbase?: string,
}

export type Input = {
  type: "Input",
  bits: number,
}

export type Output = {
  type: "Output",
  bits: number,
}

export type BusGroup = {
  type: "BusGroup",
  groups: Array<number>,
}

export type BusUngroup = {
  type: "BusUngroup",
  groups: Array<number>,
}

export type BusSlice = {
  type: "BusSlice",
  slice: {
    first: number,
    count: number,
    total: number,
  }
}

export type Extend = {
  type: "ZeroExtend" | "SignExtend",
  extend: {
    input: number,
    output: number,
  }
}

export type FSM = {
  type: "FSM",
  bits: {
    in: number,
    out: number,
  },
  states: number,
  init_state: number,
  current_state: number,
  trans_table: Array<{
    ctrl_in: string,
    ctrl_out: string,
    state_in: number,
    state_out: number,
  }>,
}

export type Device = 
  (UnaryGate |
  BinaryGate |
  ReducingGate |
  BitShift |
  Comparision |
  Constant |
  UnaryArith |
  BinaryArith |
  Mux |
  Mux1Hot |
  Dff |
  Memory |
  Clock |
  Button |
  Lamp |
  NumEntry |
  NumDisplay |
  Input |
  Output |
  BusGroup |
  BusUngroup |
  BusSlice |
  Extend |
  FSM) & {
    // Seems that this is optional, yosys "Constant" doesn't include label
    label?: string,
    net?: string,
    order?: number,
  }

export interface Plug {
  id : string,
  port : string
}

export interface Connector {
  to : Plug,
  from : Plug
  name?: string
}

export interface Circuit {
  devices: ObjMap<Device>
  connectors: Array<Connector>
}

export interface Digitaljs {
  devices: ObjMap<Device>
  connectors: Array<Connector>
  subcircuits: ObjMap<Circuit>
}
