import chisel3._
import chisel3.Driver
import adder.Main


object Main extends App {
    chisel3.Driver.execute(Array[String](), () => new Main);
}
            