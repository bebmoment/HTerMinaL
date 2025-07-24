#include <stdio.h>
#include <string.h>
#include "check.h"

int succeed() {
    printf("%s", "Welcome");
    return 0;
}

int checkPassword(char* pass) {
    char password[64];
    strcpy(password, pass);
    return isValidPassword(password);
}

int main(int argc, char** argv) {
    
    if (checkPassword(argv[1])) {
        return succeed();
    } else {
        fprintf(stderr, "wrong password, try again");
        return -1;
    }
    
}