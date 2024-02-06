import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../services/product-service.service';
import { ProductDto } from '../dtos/productDto';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public products: any[] = [];
  size: number = 12;
  currentPage: number = 1;
  visiblePage: number[] = [];
  totalPages: number = 0;
  constructor(
    private productService: ProductService,
    private userService: UserService
  ) {
    this.getAll(this.currentPage);
  }

  ngOnInit() {}
  getAll(page: number) {
    this.productService.getAll(this.size, page).subscribe({
      next: (response: any) => {
        // response.products.forEach((product: any) => {
        //   product.thumbnail = '';
        // });
        this.products = response.content;
        this.totalPages = response.totalPages;
        this.visiblePage = this.generateVisiblePaginationButton(
          this.currentPage,
          this.totalPages
        );
      },
      complete: () => {},
      error: (error: any) => {
        console.error('Error fetching products: ', error);
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getAll(this.currentPage);
  }
  generateVisiblePaginationButton(
    currentPage: number,
    totalPages: number
  ): number[] {
    const maxVisiblePages = 5;
    const haflVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(currentPage - haflVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    return new Array(endPage - startPage + 1)
      .fill(0)
      .map((_, index) => startPage + index);
  }

  // toProductDetail(id: number) {
  //   const link = new RouterLink({
  //     path: `/product-detail/${id}`,
  //   });
  //   this.router.navigate(link);
  // }
}
