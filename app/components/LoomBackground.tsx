"use client";

import { useEffect, useRef } from "react";

const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export default function LoomBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const lastActivityRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas ref is null");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Could not get 2d context");
      return;
    }

    console.log("LoomBackground mounted successfully");

    // Setup canvas size
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      console.log(`Canvas setup: ${rect.width}x${rect.height}, dpr: ${dpr}`);
    };

    setupCanvas();
    window.addEventListener("resize", setupCanvas);

    // Initialize nodes
    const initNodes = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const nodeCount = Math.floor((width * height) / 15000);
      
      nodesRef.current = [];
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: 2 + Math.random() * 2,
        });
      }
      
      console.log(`Created ${nodeCount} nodes`);
    };

    initNodes();

    // Activity tracking
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("touchstart", handleActivity);
    window.addEventListener("keydown", handleActivity);

    // Animation loop
    let frameCount = 0;
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (frameCount === 0) {
        console.log("First animation frame running");
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Update nodes
      nodesRef.current.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around edges
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;
      });

      // Calculate connection distance based on activity
      const timeSinceActivity = Date.now() - lastActivityRef.current;
      const isActive = timeSinceActivity < 3000;
      const maxDistance = isActive ? 150 : 100;

      // Draw connections
      const nodes = nodesRef.current;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3;
            const colorIndex = (i + j) % GOOGLE_COLORS.length;
            
            ctx.beginPath();
            ctx.strokeStyle = `${GOOGLE_COLORS[colorIndex]}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      });

      frameCount++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", setupCanvas);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}
