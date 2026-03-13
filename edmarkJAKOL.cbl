IDENTIFICATION DIVISION.
       PROGRAM-ID. DEPT-CHECKER.
       AUTHOR. EDMARK.

       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  USER-INFO.
           05  USER-NAME        PIC X(20) VALUE "PIOLS-BRO".
           05  IS-AI-USER       PIC X(1)  VALUE "N".
       
       01  PRODUCT-DATA.
           05  PRODUCT-NAME     PIC X(30).
           05  DEPT-CODE        PIC 9(2).
           05  DEPT-NAME        PIC X(15).

       01  JUMPSCARE-ASSETS.
           05  GHOST-FACE       PIC X(50) VALUE " (╯°□°）╯︵ ┻━┻ ".
           05  HULI-MSG         PIC X(50) VALUE "HULI KA! GUMAGAMIT KA NG AI MESSAGE!".

       PROCEDURE DIVISION.
       100-START-LOGIC.
           DISPLAY "=== GIGAHERTZ DEPT CHECKER v1.0 ===".
           DISPLAY "INPUT PRODUCT NAME: ".
           ACCEPT PRODUCT-NAME.
           DISPLAY "INPUT DEPT CODE (01-03): ".
           ACCEPT DEPT-CODE.

           PERFORM 200-VALIDATE-USER.
           PERFORM 300-CHECK-DEPARTMENT.
           
           DISPLAY "SMILE PARA KAY IZUMI! 😊".
           STOP RUN.

       200-VALIDATE-USER.
           IF IS-AI-USER = "Y"
               DISPLAY "------------------------------------"
               DISPLAY GHOST-FACE
               DISPLAY HULI-MSG
               DISPLAY "!!! JUMPSCARE !!! BOO! !!!"
               DISPLAY "------------------------------------"
           ELSE
               DISPLAY "VIBE CHECK PASSED, BRO. STAY GIRLY. ✨"
           END-IF.

       300-CHECK-DEPARTMENT
           EVALUATE DEPT-CODE
               WHEN 01
                   MOVE "KITCHEN-CORE" TO DEPT-NAME
               WHEN 02
                   MOVE "GIGAHERTZ-DEV" TO DEPT-NAME
               WHEN 03
                   MOVE "COQUETTE-VIBE" TO DEPT-NAME
               WHEN OTHER
                   MOVE "UNKNOWN-DEPT"  TO DEPT-NAME
           END-EVALUATE.

           DISPLAY "PRODUCT: " PRODUCT-NAME.
           DISPLAY "ASSIGNED TO: " DEPT-NAME.
           
           IF DEPT-NAME = "COQUETTE-VIBE"
               DISPLAY "STATUS: 🎀 SUPER GIRLIE APPROVED 🎀"
           END-IF.
