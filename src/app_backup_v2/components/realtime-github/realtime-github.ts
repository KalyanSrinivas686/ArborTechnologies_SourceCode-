import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface GitHubActivity {
  id: string;
  type: string;
  repo: string;
  author: string;
  avatar: string;
  message: string;
  timestamp: Date;
  url: string;
}

@Component({
  selector: 'app-realtime-github',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './realtime-github.html',
  styleUrl: './realtime-github.css'
})
export class RealtimeGithubComponent implements OnInit, OnDestroy {
  activities: GitHubActivity[] = [];
  loading = true;
  error: string | null = null;
  private updateInterval: any;

  // Popular repositories to monitor
  repos = [
    'microsoft/vscode',
    'facebook/react',
    'angular/angular',
    'nodejs/node',
    'kubernetes/kubernetes',
    'docker/docker-ce'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchGitHubActivity();
    // Update every 30 seconds (GitHub API rate limit: 60 requests/hour for unauthenticated)
    this.updateInterval = setInterval(() => {
      this.fetchGitHubActivity();
    }, 30000);
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  fetchGitHubActivity() {
    this.loading = true;
    this.error = null;
    
    // Fetch events from multiple popular repositories
    const promises = this.repos.slice(0, 3).map(repo => {
      const apiUrl = `https://api.github.com/repos/${repo}/events`;
      
      return this.http.get<any[]>(apiUrl).toPromise().then((events: any[] | undefined) => {
        if (!events || !Array.isArray(events)) {
          return [];
        }
        return events.slice(0, 2).map(event => {
          let activity: GitHubActivity = {
            id: event.id,
            type: event.type,
            repo: repo,
            author: event.actor?.login || 'Unknown',
            avatar: event.actor?.avatar_url || '',
            message: this.getEventMessage(event),
            timestamp: new Date(event.created_at),
            url: `https://github.com/${repo}`
          };
          return activity;
        });
      }).catch((err) => {
        console.error(`Error fetching GitHub activity for ${repo}:`, err);
        return [];
      });
    });

    Promise.all(promises).then(results => {
      const allActivities = results.flat();
      // Sort by timestamp, most recent first
      allActivities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      this.activities = allActivities.slice(0, 10);
      this.loading = false;
      if (this.activities.length === 0) {
        this.error = 'Unable to fetch GitHub activity. API rate limit may be reached.';
      }
    });
  }

  getEventMessage(event: any): string {
    switch (event.type) {
      case 'PushEvent':
        return `Pushed ${event.payload.commits?.length || 0} commit(s)`;
      case 'WatchEvent':
        return 'Starred the repository';
      case 'ForkEvent':
        return 'Forked the repository';
      case 'IssuesEvent':
        return `${event.payload.action} an issue`;
      case 'PullRequestEvent':
        return `${event.payload.action} a pull request`;
      case 'CreateEvent':
        return `Created ${event.payload.ref_type}`;
      default:
        return event.type.replace('Event', '');
    }
  }

  getEventIcon(type: string): string {
    switch (type) {
      case 'PushEvent': return 'fa-code-branch';
      case 'WatchEvent': return 'fa-star';
      case 'ForkEvent': return 'fa-code-fork';
      case 'IssuesEvent': return 'fa-bug';
      case 'PullRequestEvent': return 'fa-code-pull-request';
      case 'CreateEvent': return 'fa-plus';
      default: return 'fa-circle';
    }
  }

  getTimeAgo(timestamp: Date): string {
    const seconds = Math.floor((new Date().getTime() - timestamp.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}
