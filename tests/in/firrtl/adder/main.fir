;buildInfoPackage: chisel3, version: 3.2.2, scalaVersion: 2.11.12, sbtVersion: 1.3.2
circuit Main : 
  module Main : 
    output io : {flip A : UInt<1>, flip B : UInt<1>, flip Cin : UInt<1>, Sum : UInt<1>, Cout : UInt<1>}
    
    node _T = xor(io.A, io.B) @[Adder.scala 13:18]
    node _T_1 = xor(_T, io.Cin) @[Adder.scala 13:25]
    io.Sum <= _T_1 @[Adder.scala 13:10]
    node _T_2 = and(io.A, io.B) @[Adder.scala 14:20]
    node _T_3 = and(io.A, io.Cin) @[Adder.scala 14:36]
    node _T_4 = or(_T_2, _T_3) @[Adder.scala 14:28]
    node _T_5 = and(io.B, io.Cin) @[Adder.scala 14:54]
    node _T_6 = or(_T_4, _T_5) @[Adder.scala 14:46]
    io.Cout <= _T_6 @[Adder.scala 14:11]
 