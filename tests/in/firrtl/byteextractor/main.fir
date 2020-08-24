;buildInfoPackage: chisel3, version: 3.2.2, scalaVersion: 2.11.12, sbtVersion: 1.3.2
circuit Main : 
  module Main : 
    output io : {flip sel : UInt<2>, flip bytes : UInt<32>, sel_byte : UInt<8>}
    
    node _T = eq(io.sel, UInt<2>("h00")) @[Main.scala 10:18]
    when _T : @[Main.scala 10:32]
      node _T_1 = bits(io.bytes, 7, 0) @[Main.scala 11:32]
      io.sel_byte <= _T_1 @[Main.scala 11:21]
      skip @[Main.scala 10:32]
    else : @[Main.scala 12:34]
      node _T_2 = eq(io.sel, UInt<1>("h01")) @[Main.scala 12:25]
      when _T_2 : @[Main.scala 12:34]
        node _T_3 = bits(io.bytes, 15, 8) @[Main.scala 13:32]
        io.sel_byte <= _T_3 @[Main.scala 13:21]
        skip @[Main.scala 12:34]
      else : @[Main.scala 14:34]
        node _T_4 = eq(io.sel, UInt<2>("h02")) @[Main.scala 14:25]
        when _T_4 : @[Main.scala 14:34]
          node _T_5 = bits(io.bytes, 23, 16) @[Main.scala 15:32]
          io.sel_byte <= _T_5 @[Main.scala 15:21]
          skip @[Main.scala 14:34]
        else : @[Main.scala 16:18]
          node _T_6 = bits(io.bytes, 31, 24) @[Main.scala 17:32]
          io.sel_byte <= _T_6 @[Main.scala 17:21]
          skip @[Main.scala 16:18]
