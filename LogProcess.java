import java.io.PrintStream;
import java.net.URL;
import java.net.URLConnection;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Scanner;

public class LogProcess{
public static void main(String[] args){
                	Scanner S = new Scanner(System.in);
        String s1="";
        String Decision="y";
        while(Decision.toLowerCase()=="y"){
        	System.out.println("you want to create log :Y/N");
        	Decision = S.nextLine();
        	System.out.println(Decision);
           if(Decision.toLowerCase().equals("y"))
           {
        	   System.out.println("Please Process Name to which log needs to be created");
        	   String processname = S.nextLine();
        	   System.out.println("Please enter all log components by seperated by ,");
        	   String logdetails = S.nextLine();
        	   s1=processname+","+logdetails;
           }
           
        }
}
}
