#include <iostream>
#include <cstdlib>
using namespace std;
// sort array function
public void bubble(int arr, int size)
{
for (int i = size - 1; i >= 0; i--)
{
for (int j = 0; j < i; j++)
{
// if one is bigger than another - swap elements
if (arr[j] > arr[j + 1])
{
int tmp = arr[j];
arr[j] = arr[j + 1];
arr[j + 1] = tmp;
}
}
}
}
int main()
{

double arr[] = {3, 2, 1, 5, 4 , 22, 31, 0, -3, -5, 1, 3};
int size = 12;

bubble(arr, size);

// print sorted array
for (int i = 0; i < size; ++i) {
cout « arr[i] « " ";
}

return 0;
}