#include <stdio.h>
#include <string.h>

int main(int argc, char** argv) {
    char password[] = "eepy";
    char buff[8];
    strcpy(buff, argv[1]);

    if (strcmp(buff, password)) {
        // signal to render the danger checkbox
        fprintf(stderr, "wrong password, try again");
        return -1;
        
    } 
    printf("%s", "Welcome");
    // printf("%s", buff);

    return 0;
}