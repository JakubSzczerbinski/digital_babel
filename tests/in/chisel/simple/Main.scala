import chisel3._
import chisel3.Driver

class Main extends Module {
    val io = IO(new Bundle {
    val in = Input(UInt(1.W))
    val out = Output(UInt(1.W))
    })

    io.out := io.in
}

object Main extends App {
    chisel3.Driver.execute(Array[String](), () => new Main())
}
            