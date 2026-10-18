//exampe of code for this plugin
#include <iostream>
#include <vector>

int insertionSort(std::vector<int>& a){
    int cnt = 0; 
    for (size_t i = 1;i < a.size(); i++){
        int key = a[i];
        size_t j = i;
        while(j > 0){
            cnt++;
            if(a[j - 1] > key){
                a[j] = a[j - 1];
                --j;
            } else{
                break;
            }
        }
        a[j] = key;
    }
    return cnt;
}

int main(){
    int n;
    std::cin >> n;
    std::vector<int> a(n);
    for (int i = 0; i < n; i++) std::cin >> a[i];

    int k = insertionSort(a);
    std::cout << k << '\n';

}