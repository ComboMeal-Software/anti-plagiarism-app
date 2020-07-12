#include <iostream>
#include <cstdlib>
using namespace std;
public void bubbleSort(double a, int n)
{
int index1 = n-1;
while (index1 >= 0)
{
for (int index2 = 0; index2 < index1; index2++)
{
if (a[index2 + 1] < a[index2])
{
int temp = a[index2];
a[index2] = a[index2 + 1];
a[index2 + 1] = temp;
}
}
index1--;
}
}
int main()
{

double a[] = {3, 2, 1, 5, 4 , 22, 31, 0, -3, -5, 1, 3};
int n = 12;

bubbleSort(a, n);

// print sorted array
for (int k = 0; k < n; ++k) {
cout « a[k] « " ";
}

return 0;
}