package adder

import chisel3._

class Main extends Module {
  val io = IO(new Bundle {
    val A    = Input(UInt(1.W))
    val B    = Input(UInt(1.W))
    val Cin  = Input(UInt(1.W))
    val Sum  = Output(UInt(1.W))
    val Cout = Output(UInt(1.W))
  })
  io.Sum := io.A ^ io.B ^ io.Cin
  io.Cout := (io.A & io.B) | (io.A & io.Cin) | (io.B & io.Cin)
}
