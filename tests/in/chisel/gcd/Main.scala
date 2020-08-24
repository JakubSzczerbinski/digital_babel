import chisel3._
import chisel3.Driver

class Main extends Module {
    val io = IO(new Bundle{
        val a      = Input(UInt(32.W))
        val b      = Input(UInt(32.W))
        val load   = Input(Bool())
        val ready  = Output(UInt(1.W))
        val result = Output(UInt(32.W))
    });
    val x = Reg(UInt(32.W))
    val y = Reg(UInt(32.W))

    when (io.load) {
        x := io.a; y := io.b;
    } .otherwise {
        when (x > y) {
            x := x - y
        } .otherwise {
            y := y - x
        }
    }
    
    io.result := x;
    io.ready := y === 0.U;
}


object Main extends App {
    chisel3.Driver.execute(Array[String](), () => new Main);
}
            