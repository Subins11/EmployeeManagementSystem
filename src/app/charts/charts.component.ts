import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  @ViewChild('chart') private chartContainer!: ElementRef;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createLeaveChart();
  }

  private createLeaveChart(): void {
    //Datas
    const leavesData = [
      { employee: 'Present', leaves: 120 },
      { employee: 'Leave', leaves: 30 },
    ];

    //SVG Container Setup

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 250 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //Scales
    const x: d3.ScaleBand<string> = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(leavesData.map((d) => d.employee));

    const leavesWithoutUndefined = leavesData
      .map((d) => d.leaves)
      .filter((value) => value !== undefined) as number[];
    const maxLeaves = d3.max(leavesWithoutUndefined) || 0;
    const y = d3.scaleLinear().range([height, 0]).domain([0, 150]);

    //Axes
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));

    //Bars
    svg
      .selectAll('.bar')
      .data(leavesData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.employee) || 0)
      .attr('width', x.bandwidth())
      .attr('y', (d) => y(d.leaves || 0))
      .attr('height', (d) => height - y(d.leaves || 0))
      .attr('rx', 0)
      .attr('ry', 0)
      .attr('fill', (d) => (d.employee === 'Present' ? '#bc5090' : '#ffa600'));
  }
}
