import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        boolean menuActivo = true;

        while(menuActivo){
            opciones();
            System.out.println("\nIngrese su eleccion: ");
            int seleccion = sc.nextInt();
            Calculator calculadora = new Calculator();
            switch(seleccion) {
                case 1: calculadora.sumar();
                    break;
                case 2: calculadora.restar();
                    break; 
                case 3: calculadora.multiplicar();
                    break;
                case 4: calculadora.dividirNumeros();
                    break;
                case 5: calculadora.modulo();
                    break;
                case 6: menuActivo = false;
                    break;
                default: System.out.println("El numero igresado es incorrecto");
                    break;
            }
        }
        sc.close();
    }

    public static void opciones(){
        System.out.println("\nOPCIONES DELA CALCULADORA: \n" + 
        "1. SUMA \n" +
        "2. RESTA \n" +
        "3. MULTIPLICACION \n" +
        "4. DIVISION \n" +
        "5. MODULO \n"+
        "6. SALIR");
    }

}