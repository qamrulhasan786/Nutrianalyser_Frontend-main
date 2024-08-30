import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { LoadingScreenService } from 'src/app/services/loading-screen/loading-screen.service';


@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements AfterViewInit, OnDestroy {

  debounceTime: number = 100;
  loading: boolean = false;
  loadingSubscription: Subscription | undefined;

  constructor(private loadingScreenService: LoadingScreenService,
              private _elmRef: ElementRef,
              private _changeDetectorRef: ChangeDetectorRef) {
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    this._elmRef.nativeElement.style.display = 'none';
    this.loadingSubscription = this.loadingScreenService.loadingStatus.pipe(debounceTime(this.debounceTime)).subscribe(
      (status: boolean) => {
        this._elmRef.nativeElement.style.display = status ? 'block' : 'none';
        this._changeDetectorRef.detectChanges();
      }
    );
  }

  // ngOnDestroy() {
  //   this.loadingSubscription.unsubscribe();
  // }

}