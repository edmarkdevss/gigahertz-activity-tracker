import java.util.Scanner;
import java.util.Random;
import java.util.ArrayList;

public class MiniPaymentSystem {
    private static double userWalletBalance = 500.00;
    private static ArrayList<String> logs = new ArrayList<>();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        double fee = 50.00;
        boolean sessionActive = true;
        System.out.println("=== CyberSafe TVI Terminal ===");
        System.out.println("Current Wallet Balance: PHP " + userWalletBalance);
        while (sessionActive) {
            displayMenu(fee);
            String choice = scanner.next();
            if (choice.equals("1")) {
                handleTransaction(scanner, fee);
            } else if (choice.equals("2")) {
                showHistory();
            } else if (choice.equals("3")) {
                sessionActive = false;
                System.out.println("Exiting secure terminal...");
            } else {
                System.out.println("Invalid option, try again.");
            }
        }
        scanner.close();
    }

    private static void displayMenu(double fee) {
        System.out.println("\n[SECURE GATEWAY]");
        System.out.println("1. Pay Access Fee (PHP " + fee + ")");
        System.out.println("2. View Logs");
        System.out.println("3. Logout");
        System.out.print("Selection: ");
    }

    private static void handleTransaction(Scanner sc, double cost) {
        System.out.print("Enter payment amount: ");
        try {
            double input = sc.nextDouble();
            if (input < cost) {
                System.out.println("Insufficient funds for this tier.");
                logs.add("FAILED: Attempted " + input + " for " + cost);
            } else {
                executePayment(input, cost);
            }
        } catch (Exception e) {
            System.out.println("Error: Numeric values only.");
            sc.next();
        }
    }

    private static void executePayment(double paid, double cost) {
        double change = paid - cost;
        userWalletBalance -= cost;
        String tid = generateTID();
        System.out.println("\n--- OFFICIAL RECEIPT ---");
        System.out.println("Transaction ID: " + tid);
        System.out.println("Status: APPROVED");
        System.out.printf("Fee Paid: PHP %.2f\n", cost);
        System.out.printf("Change: PHP %.2f\n", change);
        System.out.println("New Balance: PHP " + userWalletBalance);
        System.out.println("------------------------");
        System.out.println("Access Granted. Welcome, bro!");
        logs.add("SUCCESS: TID " + tid + " | Paid " + cost);
    }

    private static String generateTID() {
        Random r = new Random();
        int n = r.nextInt(90000) + 10000;
        return "CS-" + n;
    }

    private static void showHistory() {
        System.out.println("\n--- SYSTEM LOGS ---");
        if (logs.isEmpty()) {
            System.out.println("No records found.");
        } else {
            for (String entry : logs) {
                System.out.println("> " + entry);
            }
        }
    }

    public static void processPayment(double paid, double required) {
        if (paid >= required) {
            System.out.println("Payment validated manually.");
            executePayment(paid, required);
        } else {
            System.out.println("Manual validation failed.");
        }
    }
}
