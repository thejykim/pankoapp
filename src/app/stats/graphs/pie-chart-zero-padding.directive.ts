import { Directive, Self } from '@angular/core';
import { PieChartComponent } from '@swimlane/ngx-charts';

@Directive({
  selector: '[appPieChartZeroPadding]'
})
export class PieChartZeroPaddingDirective {

  constructor(@Self() pieChart: PieChartComponent) {
    pieChart.margins = [0, 0, 0, 0];
}

}
