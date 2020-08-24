;buildInfoPackage: chisel3, version: 3.2.2, scalaVersion: 2.11.12, sbtVersion: 1.3.2
circuit Main : 
  module Main : 
    input clock : Clock
    input reset : UInt<1>
    output io : {flip a : UInt<32>, flip b : UInt<32>, flip load : UInt<1>, ready : UInt<1>, result : UInt<32>}
    
    reg x : UInt<32>, clock @[Main.scala 12:16]
    reg y : UInt<32>, clock @[Main.scala 13:16]
    when io.load : @[Main.scala 15:20]
      x <= io.a @[Main.scala 16:11]
      y <= io.b @[Main.scala 16:22]
      skip @[Main.scala 15:20]
    else : @[Main.scala 17:18]
      node _T = gt(x, y) @[Main.scala 18:17]
      when _T : @[Main.scala 18:22]
        node _T_1 = sub(x, y) @[Main.scala 19:20]
        node _T_2 = tail(_T_1, 1) @[Main.scala 19:20]
        x <= _T_2 @[Main.scala 19:15]
        skip @[Main.scala 18:22]
      else : @[Main.scala 20:22]
        node _T_3 = sub(y, x) @[Main.scala 21:20]
        node _T_4 = tail(_T_3, 1) @[Main.scala 21:20]
        y <= _T_4 @[Main.scala 21:15]
        skip @[Main.scala 20:22]
      skip @[Main.scala 17:18]
    io.result <= x @[Main.scala 25:15]
    node _T_5 = eq(y, UInt<1>("h00")) @[Main.scala 26:19]
    io.ready <= _T_5 @[Main.scala 26:14]