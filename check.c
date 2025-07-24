#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <string.h>

int isValidPassword(char *input)
{
	char actual_password[1024];
	int fd = open("./password", O_RDONLY);
	if (fd < 0)
	{
		perror("read");
		printf("Report this to an admin\n");
		return 0;
	}

	ssize_t n_read = read(fd, actual_password, 1024); // probably 15 by default
	if (1) // originally check if ends with line feed ``actual_password[n_read-1] == 0xa`` : always end it with null terminator now
	{
		actual_password[n_read] = 0x0;
	}
	close(fd);
	return (strcmp(actual_password, input) == 0);
}