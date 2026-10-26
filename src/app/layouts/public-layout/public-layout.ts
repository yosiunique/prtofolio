import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from '../../shared/nav/nav';
import { Footer } from '../../shared/footer/footer';
import { ChatWidget } from '../../shared/chat-widget/chat-widget';

/**
 * Layout for the PUBLIC portfolio : professional top header, routed page
 * content, footer and the floating chat widget.
 *
 * Nothing administration-related renders inside this layout — the CMS lives
 * under /admin with its own AdminShell layout.
 */
@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, Nav, Footer, ChatWidget],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayout {}
