import chisel3._
import chisel3.Driver

object OP {
    val SUB = 0.U(2.W);
    val ADD = 1.U(2.W);
    val MUL = 2.U(2.W);
    val DIV = 3.U(2.W);
}

class Main extends Module {
    val io = IO(new Bundle{
        val op      = Input(UInt(2.W))
        val a       = Input(UInt(16.W))
        val b       = Input(UInt(16.W))
        val result  = Output(UInt(32.W))
    });


    when (io.op === OP.SUB) {
        io.result := io.a - io.b;
    } .elsewhen (io.op === OP.ADD) {
        io.result := io.a + io.b;
    } .elsewhen (io.op === OP.MUL) {
        io.result := io.a * io.b;
    } .elsewhen (io.op === OP.DIV) {
        io.result := io.a / io.b;
    } .otherwise {
        io.result := 0.U(32.W);
    }
}


object Main extends App {
    chisel3.Driver.execute(Array[String](), () => new Main);
}
            