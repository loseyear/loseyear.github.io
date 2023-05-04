// src/pages/ResizablePanelsPage/ResizablePanelsPage.tsx

import React, { useState } from 'react'
import { Panel, PanelGroup } from 'react-resizable-panels'

import ResizeHandle from './ResizeHandle'
import './style.css'

export default function App() {
  const [showFirstPanel, setShowFirstPanel] = useState(true)
  const [showLastPanel, setShowLastPanel] = useState(true)

  return (
    <div className="Container">
      <div className="TopRow">
        <p>
          <button
            className="Button"
            onClick={() => setShowFirstPanel(!showFirstPanel)}
          >
            {showFirstPanel ? 'hide' : 'show'} top panel
          </button>
          &nbsp;
          <button
            className="Button"
            onClick={() => setShowLastPanel(!showLastPanel)}
          >
            {showLastPanel ? 'hide' : 'show'} bottom panel
          </button>
        </p>
      </div>
      <div className="BottomRow">
        <PanelGroup autoSaveId="example" direction="vertical">
          {showFirstPanel && (
            <>
              <Panel
                className="Panel"
                collapsible={true}
                defaultSize={20}
                order={1}
              >
                <div className="PanelContent">top</div>
              </Panel>
              <ResizeHandle />
            </>
          )}
          <Panel className="Panel" collapsible={true} order={2}>
            <div className="PanelContent">middle</div>
          </Panel>
          {showLastPanel && (
            <>
              <ResizeHandle />
              <Panel
                className="Panel"
                collapsible={true}
                defaultSize={20}
                order={3}
              >
                <div className="PanelContent">bottom</div>
              </Panel>
            </>
          )}
        </PanelGroup>
      </div>
    </div>
  )
}

