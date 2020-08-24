import chisel3._
import chisel3.Driver

class Main extends Module {
    val io = IO(new Bundle{
        val sel      = Input(UInt(2.W))
        val bytes    = Input(UInt(32.W))
        val sel_byte = Output(UInt(8.W))
    });
    when (io.sel === 0.U(2.W)) {
        io.sel_byte := io.bytes(7, 0)
    } .elsewhen (io.sel === 1.U) {
        io.sel_byte := io.bytes(15, 8)
    } .elsewhen (io.sel === 2.U) {
        io.sel_byte := io.bytes(23, 16)
    } .otherwise {
        io.sel_byte := io.bytes(31, 24)
    }
}


object Main extends App {
    chisel3.Driver.execute(Array[String](), () => new Main);
}
            