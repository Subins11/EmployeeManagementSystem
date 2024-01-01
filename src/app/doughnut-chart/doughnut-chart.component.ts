import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit {
  @ViewChild('doughnuChart', { static: true })
  private chartContainer!: ElementRef;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.createDoughnutChart();
  }

  createDoughnutChart() {
    const data = [180, 30]; // Data
    const width = 350;
    const height = 350;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(['#0b9649', '#af0715c7']);

    //SVG Container
    const svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    //Arc and Pie Functions
    const arc = d3
      .arc()
      .innerRadius(radius - 100)
      .outerRadius(radius);
    const pie = d3.pie();

    //Drawing Arcs
    const arcs = svg
      .selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', <any>arc)
      .attr('fill', function (d: any, i: any) {
        return color(i);
      });

    //Adding Labels
    arcs
      .append('text')
      .attr('transform', function (d) {
        const x = arc.centroid(<any>d)[0];
        const y = arc.centroid(<any>d)[1];
        return 'translate(' + x + ',' + y + ')';
      })
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .text(function (d, i) {
        return i === 0 ? 'Active Employees' : 'Inactive Employees';
      });
  }
}
