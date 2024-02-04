import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service.service';
import { faFile , faPenToSquare , faTrash} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-manager-product',
  templateUrl: './manager-product.component.html',
  styleUrl: './manager-product.component.scss',
})
export class ManagerProductComponent {
  iconDetail = faFile;
  iconUpdate= faPenToSquare;
  iconDelete= faTrash
  public products: any[] = [];
  size: number = 8;
  currentPage: number = 1;
  visiblePage: number[] = [];
  totalPages: number = 0;
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.getAll(this.currentPage);
  }

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
}
